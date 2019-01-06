<?php

declare(strict_types=1);

namespace App\Model;

use Locale;

class Country
{
    private $code;
    private $name;
    private $native;
    private $emoji;
    private $directory;

    public function __construct(string $name, string $lang = 'en', ?string $directory = null)
    {
        $json = json_decode(file_get_contents('vendor/annexare/countries-list/dist/countries.emoji.min.json'), true);

        if (strlen($name) === 2) {
            $this->code = $name;
            $country = $json[$this->code];
        } else {
            $list = array_filter($json, function ($c) use ($name) {
                return strtolower($c['name']) === strtolower($name);
            });

            if (count($list) > 0) {
                $this->code = current(array_keys($list));
                $country = $list[$this->code];
            } else {
                $this->code = '??';
            }
        }

        if (isset($country)) {
            $this->name = Locale::getDisplayRegion('-'.$this->code, $lang);

            $this->native = $country['native'];
            $this->emoji = $country['emoji'];
        } else {
            $this->name = ucwords($name);
        }

        $this->directory = $directory;
    }

    public function getCode() : string
    {
        return $this->code;
    }

    public function getDirectory() : ?string
    {
        return $this->directory;
    }

    public function getEmoji() : ?string
    {
        return $this->emoji;
    }

    public function getName() : string
    {
        return $this->name;
    }

    public function getNative() : ?string
    {
        return $this->native;
    }
}
