<?php

namespace App\Tests\Api;

use ApiPlatform\Symfony\Bundle\Test\ApiTestCase;
use App\Entity\User;
use Hautelook\AliceBundle\PhpUnit\RefreshDatabaseTrait;

class UserRegistrationTest extends ApiTestCase
{
    // We don't have HautelookAliceBundle installed, so we'll handle cleanup manually or trust SQLite test file isolation
    
    public function testRegistration(): void
    {
        $client = static::createClient();
        
        $email = 'test-' . uniqid() . '@example.com';
        $password = 'password123';

        $response = $client->request('POST', '/api/users', [
            'json' => [
                'email' => $email,
                'password' => $password,
            ],
            'headers' => [
                'Content-Type' => 'application/json',
            ],
        ]);

        $this->assertResponseStatusCodeSame(201);
        $this->assertResponseHeaderSame('content-type', 'application/json; charset=utf-8');
        
        $data = $response->toArray();
        $this->assertArrayHasKey('email', $data);
        $this->assertSame($email, $data['email']);
        $this->assertArrayNotHasKey('password', $data); // Password should be hidden
    }

    public function testDuplicateEmailRegistration(): void
    {
        $client = static::createClient();
        $email = 'duplicate@example.com';

        // First registration
        $client->request('POST', '/api/users', [
            'json' => [
                'email' => $email,
                'password' => 'password123',
            ],
        ]);
        $this->assertResponseStatusCodeSame(201);

        // Second registration with same email
        $client->request('POST', '/api/users', [
            'json' => [
                'email' => $email,
                'password' => 'password123',
            ],
        ]);
        
        // Symfony/API Platform will return 422 for unique constraint violation if valid
        $this->assertResponseStatusCodeSame(422);
    }
}
