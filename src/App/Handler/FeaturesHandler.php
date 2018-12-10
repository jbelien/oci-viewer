<?php

declare(strict_types=1);

namespace App\Handler;

use Locale;
use Psr\Http\Message\ResponseInterface;
use Psr\Http\Message\ServerRequestInterface;
use Psr\Http\Server\RequestHandlerInterface;
use Zend\Diactoros\Response\HtmlResponse;
use Zend\Expressive\Router\RouterInterface;
use Zend\Expressive\Template\TemplateRendererInterface;

class FeaturesHandler implements RequestHandlerInterface
{
    private $containerName;
    private $router;
    private $template;

    public function __construct(
        RouterInterface $router,
        TemplateRendererInterface $template,
        string $containerName
    ) {
        $this->router = $router;
        $this->template = $template;
        $this->containerName = $containerName;
    }

    public function handle(ServerRequestInterface $request) : ResponseInterface
    {
        $group = $request->getAttribute('group');
        $country = $request->getAttribute('country');
        $lang = $request->getAttribute('lang');

        $params = $request->getQueryParams();
        $iframe = isset($params['iframe']);

        if ($group === $country) {
            $directory = 'data/osm-community-index-master/features/'.$group;
        } else {
            $directory = 'data/osm-community-index-master/features/'.$group.'/'.$country;
        }
        $featuresFiles = [];

        if (file_exists($directory) && is_dir($directory)) {
            $featuresFiles = glob($directory.'/*.geojson');
        }

        $features = [];

        foreach ($featuresFiles as $file) {
            if (is_readable($file)) {
                $features[] = json_decode(file_get_contents($file));
            }
        }

        $file = 'data/osm-community-index-master/package.json';
        $update = filemtime($file);
        $json = json_decode(file_get_contents($file));

        $data = [
            'update'   => $update,
            'version'  => $json->version,
            'country'  => strlen($country) === 2 ? Locale::getDisplayRegion('-'.$country, $lang ?? 'en') : $country,
            'iframe'   => $iframe,
            'features' => $features,
        ];

        return new HtmlResponse($this->template->render('app::features', $data));
    }
}
