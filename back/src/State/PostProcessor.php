<?php

namespace App\State;

use ApiPlatform\Metadata\Operation;
use ApiPlatform\State\ProcessorInterface;
use App\Entity\Post;

class PostProcessor implements ProcessorInterface
{
    public function process(mixed $data, Operation $operation, array $uriVariables = [], array $context = []): mixed
    {
        if ($data instanceof Post) {
            if ($data->getCreatedAt() === null) {
                $data->setCreatedAt(new \DateTimeImmutable());
            }
            $data->setUpdatedAt(new \DateTimeImmutable());
        }

        return $data;
    }
}