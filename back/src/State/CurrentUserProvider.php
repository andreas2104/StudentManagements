<?php
namespace App\State;

use ApiPlatform\Metadata\Operation;
use ApiPlatform\State\ProviderInterface;
use Symfony\Bundle\SecurityBundle\Security;
use App\Entity\User;

class CurrentUserProvider implements ProviderInterface
{
  public function __construct(
    private Security $security
  ) {
  }

  public function provide(Operation $operation, array $urivariables = [], array $context = []): ?User
  {
    $user = $this->security->getUser();
    if (!$user instanceof User) {
      return null;
    }
    return $user;
  }
}