<?php

declare(strict_types=1);

namespace App\Handler;

use Locale;
use Psr\Http\Message\ResponseInterface;
use Psr\Http\Message\ServerRequestInterface;
use Psr\Http\Server\RequestHandlerInterface;
use Symfony\Component\Yaml\Yaml;
use Zend\Diactoros\Response\HtmlResponse;
use Zend\Expressive\Router\RouterInterface;
use Zend\Expressive\Template\TemplateRendererInterface;

class ResourcesHandler implements RequestHandlerInterface
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
        $group = $request->getAttribute('group');
        $country = $request->getAttribute('country');
        $lang = $request->getAttribute('lang');

        $params = $request->getQueryParams();
        $iframe = isset($params['iframe']);

        if ($group === $country) {
            $directory = 'data/osm-community-index-master/resources/'.$group;
        } else {
            $directory = 'data/osm-community-index-master/resources/'.$group.'/'.$country;
        }
        $resourceFiles = [];

        if (file_exists($directory) && is_dir($directory)) {
            $resourceFiles = glob($directory.'/*.json');
        }

        $i18n = null;
        if (!is_null($lang)) {
            $i18nFile = 'data/osm-community-index-master/i18n/'.$lang.'.yaml';

            if (file_exists($i18nFile) && is_readable($i18nFile)) {
                $yaml = Yaml::parseFile($i18nFile);

                if (isset($yaml[$lang])) {
                    $i18n = $yaml[$lang];
                }
            }
        }

        $resources = [];

        foreach ($resourceFiles as $file) {
            if (is_readable($file)) {
                $resource = json_decode(file_get_contents($file));

                $languages = [];
                if (isset($resource->languageCodes)) {
                    sort($resource->languageCodes);

                    foreach ($resource->languageCodes as $code) {
                        $languages[$code] = Locale::getDisplayLanguage($code, $lang ?? 'en');
                    }
                }

                $description = $i18n[$resource->id]['description'] ?? $resource->description;
                if (preg_match_all('/{([a-zA-Z]+)}/', $description, $matches) > 0) {
                    foreach ($matches[1] as $match) {
                        if (isset($resource->{$match})) {
                            $description = str_replace('{'.$match.'}', $resource->{$match}, $description);
                        }
                    }
                }

                $extendedDescription = $i18n[$resource->id]['extendedDescription'] ?? $resource->extendedDescription ?? '';
                if (preg_match_all('/{([a-zA-Z]+)}/', $extendedDescription, $matches) > 0) {
                    foreach ($matches[1] as $match) {
                        if (isset($resource->{$match})) {
                            $extendedDescription = str_replace('{'.$match.'}', $resource->{$match}, $extendedDescription);
                        }
                    }
                }

                $image = null;
                $imageFile = 'data/osm-community-index-master/dist/img/'.$resource->type.'.svg';
                if (file_exists($imageFile) && is_readable($imageFile)) {
                    $image = file_get_contents($imageFile);
                }

                $resources[$resource->id] = (object) [
                    'description'         => $description,
                    'extendedDescription' => $extendedDescription,
                    'image'               => $image,
                    'languages'           => $languages,
                    'name'                => $i18n[$resource->id]['name'] ?? $resource->name,
                    'url'                 => $resource->url,
                ];
            }
        }

        $file = 'data/osm-community-index-master/package.json';
        $update = filemtime($file);
        $json = json_decode(file_get_contents($file));

        $data = [
            'update'    => $update,
            'version'   => $json->version,
            'country'   => strlen($country) === 2 ? Locale::getDisplayRegion('-'.$country, $lang ?? 'en') : $country,
            'iframe'    => $iframe,
            'i18n'      => $i18n,
            'resources' => $resources,
        ];

        return new HtmlResponse($this->template->render('app::resources', $data));
    }
}
