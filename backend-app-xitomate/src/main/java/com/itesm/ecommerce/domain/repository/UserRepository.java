package com.itesm.ecommerce.domain.repository;

import com.itesm.ecommerce.domain.model.User;

public interface UserRepository {

    User findByFirebaseId(String firebaseId);
}
