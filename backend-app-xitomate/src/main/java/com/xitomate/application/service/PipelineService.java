package com.xitomate.domain.service;

import com.xitomate.infrastructure.persistence.repository.OrderRequestPanacheRepository;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;

@ApplicationScoped
public class PipelineService {
    @Inject OrderRequestPanacheRepository repo;
    public Object getPipeline(Long supplierId){
        return repo.countByStatus(supplierId);
    }
}
