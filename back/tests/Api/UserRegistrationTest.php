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

    $response = $client->request("POST", '/api/users', [
      'json' => [
        'name' => 'testname',
        'firstname' => 'testfirstname',
        'email' => 'test@gmail.com',
        'password' => '1234',
        'contact' => '0343400334',
        'status' => 'active',
        'role' => 'user',
      ],
      "headers" => [
        "Content-Type" => "application/json",
      ],
    ]);

    $this->assertResponseStatusCodeSame(201);
    $this->assertResponseHeaderSame(
      "content-type",
      "application/ld+json; charset=utf-8",
    );
    $this->assertArrayHasKey('password', $response->toArray());

  }

  public function testDuplicateEmailRegistration(): void
  {

    $client = static::createClient();
    $client->request('POST', '/api/users', [
      'json' => [
        'name' => 'testname',
        'firstname' => 'testfirstname',
        'email' => 'test@gmail.com',
        'password' => '1234',
        'contact' => '0343400334',
        'status' => 'active',
        'role' => 'user',
      ],
      "headers" => [
        "Content-Type" => "application/json",
      ],
    ]);

    // Symfony/API Platform will return 422 for unique constraint violation if valid
    $this->assertResponseStatusCodeSame(422);
  }
}