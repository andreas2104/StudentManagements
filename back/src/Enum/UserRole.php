<?php

namespace App\Enum;

enum UserRole: string
{
    case ADMIN = 'ROLE_ADMIN';
    case ENSEIGNANT = 'ROLE_USER';

    public function getLabel(): string
    {
        return match($this) {
            self::ADMIN => 'Administrateur',
            self::ENSEIGNANT => 'Enseignant',
        };
    }
}