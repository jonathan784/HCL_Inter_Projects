package com.userserver.mongo1;


import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.when;
import java.util.ArrayList;
import java.util.List;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.mockito.junit.MockitoJUnitRunner;



@RunWith(MockitoJUnitRunner.class)
public class UserControllerTest {

    @Mock
    AuthService authservice;

    @Mock
    UserRepository testRepository;

    @Mock
    SaveUserService saveUserService;

    @InjectMocks
    UserController userController;

    User testUser1 = new User("fakeEmail1@gmail.com", "fakeName1", "fakePassword1", "fakeRole1", "fakeStatus1");
    User testUser2 = new User("fakeEmail2@gmail.com", "fakeName2", "fakePassword2", "fakeRole2", "fakeStatus2");



    @BeforeEach
    public void setup() throws Exception {
        MockitoAnnotations.openMocks(this);
    }

    //double result = calc.add(2, 4);
    @Test
    public void TestGetUser() {
        List<User> testList = new ArrayList<User>();
        testList.add(testUser1);
        when(testRepository.findAll()).thenReturn(testList);
        List<User> result = userController.getUsers();
        System.out.println(testList);
        System.out.println(result);
        assertEquals(testList, result);

        //when(userController.getUsers()).thenReturn(testList);
        //assertNotNull(userController.getUsers());

    }


    @Test
    public void testdeleteall() {
        //can't figure out how to get when, thenreturn to return a null value
        //is only currently testing if the function is returning the correct string, and not
        //  whether it is actually deleting all items from the database
        List<User> testList = new ArrayList<User>();
        testList.add(testUser1);
        //when(testRepository.findAll()).thenReturn(testList);
        assertEquals("All users delete.", userController.deleteAllUsers());
    }


    @Test
    public void testdeleteUser() {
        //same problem as previous unit test
        //only tests currently the string which is being retrieved from the method, and not whether it actually deletes the user
        //  from the database
        List<User> testList = new ArrayList<User>();
        testList.add(testUser1);
        assertEquals("user deleted with id : fakeEmail1@gmail.com", userController.deleteUser("fakeEmail1@gmail.com"));
    }


    @Test
    public void FindUserByUserEmail() {
        //List<User> testList = new ArrayList<User>();
        //testList.add(testUser1);

        //Is this actually testing the usercontroller? It feels like we're just writing stuff and it is testing that
        //How would this break if something was wrong with the user controller?
        when(testRepository.findByUserEmail("fakeEmail1@gmail.com")).thenReturn(testUser1);
        assertEquals(testUser1, testRepository.findByUserEmail("fakeEmail1@gmail.com"));
    }

    @Test
    public void TestSaveUser() {
        List<User> testList = new ArrayList<User>();
        testList.add(testUser1);
        testList.add(testUser2);
        when(testRepository.findAll()).thenReturn(testList);
        userController.saveUser(testUser1);
        userController.saveUser(testUser2);
        List<User> result = userController.getUsers();
        assertEquals(testList, result);

    }


   @Test
   public void TestauthenticateUser(){
        when(authservice.authenticateUser(testUser1)).thenReturn("true");
        assertEquals("true", userController.authenticateUser(testUser1));
   }
}