const axios = require("axios");
const fastify = require("fastify")();
const mongoose = require("mongoose");

beforeAll(async () => {
    const errorHandler = require("../utils/errorHandler");

    require("../config/mongoose/mongoose.config");

    fastify.register(require("../modules/router/routes"));

    fastify.setErrorHandler(errorHandler);

    await fastify.listen({ port: 3000 });
});

afterAll(async () => {
    await fastify.close();

    if (mongoose.connection.readyState) {
        await mongoose.disconnect();
    }
});

describe("Fastify API", () => {
    test("add group test", async () => {
        const dataObj = JSON.parse(`{"groupName": "test"}`);
        const response = await axios({
            headers: {
                "content-type": "application/json",
            },
            data: dataObj,
            method: "post",
            url: "http://localhost:3000/group/add",
        });
        expect(response.status).toBe(201);
        expect(response.data).toBe("group created successfully");
    });

    test("add category test", async () => {
        const dataObj = JSON.parse(`{
            "categoryName" : "salam",
            "groupName" : "test"
        }`);
        const response = await axios({
            headers: {
                "content-type": "application/json",
            },
            data: dataObj,
            method: "post",
            url: "http://localhost:3000/category/add",
        });
        expect(response.status).toBe(201);
        expect(response.data).toBe("category created successfully");
    });

    test("add another category test", async () => {
        const dataObj = JSON.parse(`{
            "categoryName" : "bye",
            "groupName" : "test"
        }`);
        const response = await axios({
            headers: {
                "content-type": "application/json",
            },
            data: dataObj,
            method: "post",
            url: "http://localhost:3000/category/add",
        });
        expect(response.status).toBe(201);
        expect(response.data).toBe("category created successfully");
    });

    test("add product test", async () => {
        const dataObj = JSON.parse(`{
            "productName" : "productName",
            "productPrice" : "320",
            "productCategory" : "salam"
        }`);
        const response = await axios({
            headers: {
                "content-type": "application/json",
            },
            data: dataObj,
            method: "post",
            url: "http://localhost:3000/product/add",
        });
        expect(response.status).toBe(201);
        expect(response.data).toBe("product created successfully");
    });

    test("get product by category name test", async () => {
        const response = await axios({
            method: "get",
            url: "http://localhost:3000/product/salam",
        });
        const checkResData = () => {
            
            for (const data of response.data) {
                if (data.Name && data.CategoryName === "salam") {
                    return true;
                }
            }
            return false;
        };
        expect(response.status).toBe(200);
        expect(checkResData()).toBe(true);
    });

    test("edit product name test", async () => {
        const dataObj = JSON.parse(`{
            "productNewName" : "mac mini",
            "productOldName" : "productName"
        }`);
        const response = await axios({
            headers: {
                "content-type": "application/json",
            },
            data: dataObj,
            method: "put",
            url: "http://localhost:3000/product/change-name",
        });
        expect(response.status).toBe(201);
        expect(response.data).toBe("product name updated successfully");
    });

    test("edit product price test", async () => {
        const dataObj = JSON.parse(`{
            "productName" : "mac mini",
            "productNewPrice" : "100"
        }`);
        const response = await axios({
            headers: {
                "content-type": "application/json",
            },
            data: dataObj,
            method: "put",
            url: "http://localhost:3000/product/change-price",
        });
        expect(response.status).toBe(201);
        expect(response.data).toBe("product price updated successfully");
    });

    test("edit product category test", async () => {
        const dataObj = JSON.parse(`{
            "productName" : "mac mini",
            "productNewCategory" : "bye"
        }`);
        const response = await axios({
            headers: {
                "content-type": "application/json",
            },
            data: dataObj,
            method: "put",
            url: "http://localhost:3000/product/change-category",
        });
        expect(response.status).toBe(201);
        expect(response.data).toBe("product category updated successfully");
    });

    test("search product by category test", async () => {
        const response = await axios({
            method: "get",
            url: "http://localhost:3000/category/bye/mini",
        });
        const checkResData = () => {
            for (const data of response.data) {
                if (data.Name && data.CategoryName === "bye") {
                    return true;
                }
            }
            return false;
        };
        expect(response.status).toBe(200);
        expect(checkResData()).toBe(true);

    });

    test("search product by group test", async () => {
        const response = await axios({
            method: "get",
            url: "http://localhost:3000/group/test/mini",
        });
        const checkResData = () => {
            for (const data of response.data) {
                if (data.Name && data.CategoryName === "bye") {
                    return true;
                }
            }
            return false;
        };
        expect(response.status).toBe(200);
        expect(checkResData()).toBe(true);
    });

    test("remove product test", async () => {
        const dataObj = JSON.parse(`{"productName" : "mac mini"}`);
        const response = await axios({
            headers: {
                "content-type": "application/json",
            },
            data: dataObj,
            method: "delete",
            url: "http://localhost:3000/product/remove",
        });
        expect(response.status).toBe(200);
        expect(response.data).toBe("product removed successfully");
    });

    test("get categories test", async () => {
        const response = await axios({
            method: "get",
            url: "http://localhost:3000/category",
        });
        const checkResData = () => {
            for (const data of response.data) {
                if (data.Name && data.Name === "salam") {
                    return true;
                }
            }
            return false;
        };
        expect(response.status).toBe(200);
        expect(checkResData()).toBe(true);
    });

    test("get category by name test", async () => {
        const response = await axios({
            method: "get",
            url: "http://localhost:3000/category/salam",
        });
        const checkResData = () => {
            if (response.data.Name === "salam") {
                return true;
            }
            return false;
        };
        expect(response.status).toBe(200);
        expect(checkResData()).toBe(true);
    });

    test("edit category test", async () => {
        const dataObj = JSON.parse(
            `{"categoryOldName" : "salam","categoryNewName" : "salamNew"}`
        );
        const response = await axios({
            headers: {
                "content-type": "application/json",
            },
            data: dataObj,
            method: "put",
            url: "http://localhost:3000/category/change-name",
        });
        expect(response.status).toBe(201);
        expect(response.data).toBe("category edited successfully");
    });

    test("remove category test", async () => {
        const dataObj = JSON.parse(`{"categoryName": "salamNew"}`);
        const response = await axios({
            headers: {
                "content-type": "application/json",
            },
            data: dataObj,
            method: "delete",
            url: "http://localhost:3000/category/remove",
        });
        expect(response.status).toBe(200);
        expect(response.data).toBe("category deleted successfully");
    });

    test("remove category test", async () => {
        const dataObj = JSON.parse(`{"categoryName": "bye"}`);
        const response = await axios({
            headers: {
                "content-type": "application/json",
            },
            data: dataObj,
            method: "delete",
            url: "http://localhost:3000/category/remove",
        });
        expect(response.status).toBe(200);
        expect(response.data).toBe("category deleted successfully");
    });

    test("add another group test", async () => {
        const dataObj = JSON.parse('{"groupName": "test 2"}');
        const response = await axios({
            headers: {
                "content-type": "application/json",
            },
            data: dataObj,
            method: "post",
            url: "http://localhost:3000/group/add",
        });
        expect(response.status).toBe(201);
        expect(response.data).toBe("group created successfully");
    });

    test("get groups test", async () => {
        const response = await axios({
            method: "get",
            url: "http://localhost:3000/group",
        });
        const checkResData = () => {
            for (const data of response.data) {
                if (data.Name && data.Name === "test") {
                    return true;
                }
            }
            return false;
        };
        expect(response.status).toBe(200);
        expect(checkResData()).toBe(true);
    });

    test("edit group test", async () => {
        const dataObj = JSON.parse(`{
            "groupOldName" : "test",
            "groupNewName" : "testNew"
        }`);
        const response = await axios({
            headers: {
                "content-type": "application/json",
            },
            data: dataObj,
            method: "put",
            url: "http://localhost:3000/group/change-name",
        });
        expect(response.status).toBe(201);
        expect(response.data).toBe("group edited successfully");
    });

    test("remove group test", async () => {
        const dataObj = JSON.parse(`{"groupName": "testNew"}`);
        const response = await axios({
            headers: {
                "content-type": "application/json",
            },
            data: dataObj,
            method: "delete",
            url: "http://localhost:3000/group/remove",
        });
        expect(response.status).toBe(200);
        expect(response.data).toBe("group deleted successfully");
    });

    test("remove another group test", async () => {
        const dataObj = JSON.parse(`{"groupName": "test 2"}`);
        const response = await axios({
            headers: {
                "content-type": "application/json",
            },
            data: dataObj,
            method: "delete",
            url: "http://localhost:3000/group/remove",
        });
        expect(response.status).toBe(200);
        expect(response.data).toBe("group deleted successfully");
    });
});
