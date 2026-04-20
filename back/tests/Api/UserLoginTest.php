<?php

namespace App\Tests\Api;

use ApiPlatform\Symfony\Bundle\Test\ApiTestCase;
use App\Entity\User;

class UserLoginTest extends ApiTestCase
{
    public function testLoginSuccess(): void
    {
        $client = static::createClient();
        
        $email = 'login-test@example.com';
        $password = 'password123';

        // 1. Register the user
        $client->request('POST', '/api/users', [
            'json' => [
                'email' => $email,
                'password' => $password,
            ],
        ]);
        $this->assertResponseStatusCodeSame(201);

        // 2. Try to login
        $response = $client->request('POST', '/api/login', [
            'json' => [
                'email' => $email,
                'password' => $password,
            ],
        ]);

        $this->assertResponseStatusCodeSame(200);
        $data = $response->toArray();
        $this->assertArrayHasKey('token', $data);
        $this->assertNotEmpty($data['token']);
    }

    public function testLoginFailure(): void
    {
        $client = static::createClient();
        
        $response = $client->request('POST', '/api/login', [
            'json' => [
                'email' => 'wrong@example.com',
                'password' => 'wrongpass',
            ],
        ]);

        $this->assertResponseStatusCodeSame(401);
    }
}
