package com.ead2.coursework.Service;

import com.ead2.coursework.Dto.UserDTO;
import com.ead2.coursework.Dto.LoginDTO;
import java.util.List;

public interface IUserService {
    UserDTO createUser(UserDTO userDTO);
    UserDTO updateUser(Long id, UserDTO userDTO);
    void deleteUser(Long id);
    UserDTO getUserById(Long id);
    List<UserDTO> getAllUsers();
    UserDTO login(LoginDTO loginDTO);
}