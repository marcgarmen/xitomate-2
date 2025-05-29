package com.xitomate.application.service;

import com.xitomate.infrastructure.persistence.repository.OrderRequestPanacheRepository;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import java.util.List;

@ApplicationScoped
public class PipelineService {
    @Inject OrderRequestPanacheRepository repo;
    public List<Object[]> getPipeline(Long supplierId){
        return repo.countByStatus(supplierId);
    }
}
