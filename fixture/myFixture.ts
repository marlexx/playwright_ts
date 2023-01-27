import {test as myTest} from "@playwright/test";

type uros = {
    age: number,
    email: string
}

const FirstTest = myTest.extend<uros>({ //dodati uros (age i email) na postojeci test
    age: 20,
    email: "urosvidakovic002@gmail.com"
})

export const test = FirstTest;