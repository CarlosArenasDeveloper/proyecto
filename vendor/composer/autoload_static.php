<?php

// autoload_static.php @generated by Composer

namespace Composer\Autoload;

class ComposerStaticInit4cc0d4037d8ddd11733b891f4c164523
{
    public static $prefixLengthsPsr4 = array (
        'P' => 
        array (
            'PHPMailer\\PHPMailer\\' => 20,
        ),
    );

    public static $prefixDirsPsr4 = array (
        'PHPMailer\\PHPMailer\\' => 
        array (
            0 => __DIR__ . '/..' . '/phpmailer/phpmailer/src',
        ),
    );

    public static $classMap = array (
        'Composer\\InstalledVersions' => __DIR__ . '/..' . '/composer/InstalledVersions.php',
    );

    public static function getInitializer(ClassLoader $loader)
    {
        return \Closure::bind(function () use ($loader) {
            $loader->prefixLengthsPsr4 = ComposerStaticInit4cc0d4037d8ddd11733b891f4c164523::$prefixLengthsPsr4;
            $loader->prefixDirsPsr4 = ComposerStaticInit4cc0d4037d8ddd11733b891f4c164523::$prefixDirsPsr4;
            $loader->classMap = ComposerStaticInit4cc0d4037d8ddd11733b891f4c164523::$classMap;

        }, null, ClassLoader::class);
    }
}
