import { AppDataSource } from "./data-source"
import { User } from "./entity/User"

AppDataSource.initialize().then(async () => {

    const usersRepository = await AppDataSource.getRepository(User)

    // truncate table
    usersRepository.clear()


    // add user
    let user1 = new User();
    user1.firstName = "Matheus";
    user1.lastName = "Piccoli";
    user1.email = "matheus@gmail.com";
    user1.password = "12345";
    await usersRepository.save(user1) // save user1 into database

    let user2 = new User();
    user2.firstName = "Arthur";
    user2.lastName = "Silva";
    user2.email = "arthur@gmail.com";
    user2.password = "12345";
    await usersRepository.save(user2) // save user2 into database

    // get all users
    let getUsers = await usersRepository.find();
    console.log(getUsers);

    // get one user
    let getUser = await usersRepository.findOneBy({
        email: "matheus@gmail.com"
    });
    console.log(getUser);

    // update user
    getUser.password = "Matheus123!";
    await usersRepository.save(getUser)

    // delete user
    await usersRepository.remove(getUser)

    

}).catch(error => console.log(error))
