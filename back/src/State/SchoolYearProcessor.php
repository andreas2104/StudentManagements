<?php

namespace App\State;

use App\Entity\SchoolYear;
use App\Repository\SchoolYearRepository;
use ApiPlatform\Metadata\Operation;
use ApiPlatform\State\ProcessorInterface;
use Symfony\Component\DependencyInjection\Attribute\Autowire;

class SchoolYearProcessor implements ProcessorInterface
{
  public function __construct(
      // On injecte le processeur par défaut pour sauvegarder réellement en base
    #[Autowire(service: 'api_platform.doctrine.orm.state.persist_processor')]
    private ProcessorInterface $persistProcessor,
    private SchoolYearRepository $repository
  ) {
  }

  /**
   * @param SchoolYear $data
   */
  public function process(mixed $data, Operation $operation, array $uriVariables = [], array $context = []): mixed
  {
    // 1. On appelle le processeur de base pour enregistrer l'entité actuelle
    $result = $this->persistProcessor->process($data, $operation, $uriVariables, $context);

    // 2. Si l'entité est une SchoolYear et qu'on l'active
    if ($result instanceof SchoolYear && $result->isActive()) {
      // 3. On désactive toutes les autres années dans le repository
      $this->repository->disableAllExcept($result);
    }

    return $result;
  }
}