// // This is to remove log polution during test executions
// // This is not normally done during production
// // For this exercise only
beforeEach(() => {
  jest.spyOn(global.console, 'log').mockImplementation();
});

afterEach(() => {
  jest.spyOn(global.console, 'log').mockRestore();
});
