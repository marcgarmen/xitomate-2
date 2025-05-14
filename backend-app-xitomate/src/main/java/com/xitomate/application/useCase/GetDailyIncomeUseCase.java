package com.xitomate.application.useCase;

import com.xitomate.application.service.IncomeService;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import java.time.LocalDate;
import java.util.List;

@ApplicationScoped
public class GetDailyIncomeUseCase {

    @Inject IncomeService service;

    public List<Object[]> execute(int lastNDays) {
        LocalDate start = LocalDate.now().minusDays(lastNDays);
        return service.dailyIncome(start);
    }
}
