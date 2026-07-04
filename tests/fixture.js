"use strict";
userData: async ({}, use) => {
    console.log('Setup');
    await use('Admin');
    console.log('Teardown');
};
