package com.xitomate.application.useCase;

import com.xitomate.application.service.PipelineService;
import com.xitomate.domain.dto.StatusCountDTO;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import java.util.List;
import java.util.stream.Collectors;

@ApplicationScoped
public class GetPipelineStatusUseCase {
    
    @Inject
    PipelineService service;

    public List<StatusCountDTO> getPipeline(Long supplierId) {
        List<Object[]> results = (List<Object[]>) service.getPipeline(supplierId);
        return results.stream()
                .map(result -> new StatusCountDTO((String) result[0], (Long) result[1]))
                .collect(Collectors.toList());
    }
}