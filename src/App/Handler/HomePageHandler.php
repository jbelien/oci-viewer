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

class HomePageHandler implements RequestHandlerInterface
{
    private $containerName;

    private $router;

    private $template;

    public function __construct(
        RouterInterface $router,
        TemplateRendererInterface $template = null,
        string $containerName
    ) {
        $this->router = $router;
        $this->template = $template;
        $this->containerName = $containerName;
    }

    public function handle(ServerRequestInterface $request) : ResponseInterface
    {
        $directory = 'data/osm-community-index-master/features';
        $features = [];

        if (file_exists($directory) && is_dir($directory)) {
            $groups = glob($directory.'/*', GLOB_ONLYDIR);

            foreach ($groups as $g) {
                $glob = glob($directory.'/'.basename($g).'/*', GLOB_ONLYDIR);

                $countries = [];

                foreach ($glob as $dir) {
                    $country = basename($dir);
                    if (strlen($country) === 2) {
                        $country = [
                            $country,
                            Locale::getDisplayRegion('-'.$country, 'en'),
                        ];
                    }
                    $countries[] = $country;
                }
                $features[basename($g)] = $countries;
            }
        }

        $directory = 'data/osm-community-index-master/resources';
        $resources = [];

        if (file_exists($directory) && is_dir($directory)) {
            $groups = glob($directory.'/*', GLOB_ONLYDIR);

            foreach ($groups as $g) {
                $glob = glob($directory.'/'.basename($g).'/*', GLOB_ONLYDIR);

                $countries = [];

                foreach ($glob as $dir) {
                    $country = basename($dir);
                    if (strlen($country) === 2) {
                        $country = [
                            $country,
                            Locale::getDisplayRegion('-'.$country, 'en'),
                        ];
                    }
                    $countries[] = $country;
                }
                $resources[basename($g)] = $countries;
            }
        }

        $file = 'data/osm-community-index-master/package.json';
        $update = filemtime($file);
        $json = json_decode(file_get_contents($file));

        $data = [
            'update'    => $update,
            'version'   => $json->version,
            'features'  => $features,
            'resources' => $resources,
        ];

        return new HtmlResponse($this->template->render('app::home-page', $data));
    }
}
