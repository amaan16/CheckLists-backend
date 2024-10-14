const cron = require("node-cron");
const todosController = require("./controllers/todosController");
const dbReader = require("./dbReader");

function cronJobScheduler() {
    console.log("I Am Here")
    dbReader.getUncompletedDailyTodos()
    .then(usersWithUncompletedDailyTodos => {
        usersWithUncompletedDailyTodos.forEach(user => {
            user.todos.forEach(todo => {
                todo.items.forEach(item => {
                    // Your logic for uncompleted Daily todos
                    console.log(`User: ${user.userName}, Todo Item: ${item.itemName}, Status: ${item.Status}`);
                });
            });
        });
    })
    .catch(error => {
        console.error('Error retrieving uncompleted Daily todos:', error);
    });
    console.log("I Am Back")
  dailyTodoCheck.start();
  weeklyTodoCheck.start();
  monthlyTodoCheck.start();
  quaterlyTodoCheck.start();
  halfYearlyTodoCheck.start();
  yearlyTodoCheck.start();
}

const dailyTodoCheck = cron.schedule(
  "59 23 * * *",
  () => {

    todosController.updateAllDailyTodosStatusToNo()
      .then(result => {
        console.log('All Daily Todos Status set to "No"', result);
      })
      .catch(error => {
        console.log('Error setting all Daily Todos Status to "No":', error);
      });
    console.log("dailyTodoCheck executed");
  },
  {
    scheduled: false,
    timezone: "Asia/Kolkata",
  }
);

const weeklyTodoCheck = cron.schedule(
  "59 23 * * 0",
  () => {
    console.log("weeklyTodoCheck executed");
  },
  {
    scheduled: false,
    timezone: "Asia/Kolkata",
  }
);

const monthlyTodoCheck = cron.schedule(
  "59 23 28-31 * *",
  () => {
    console.log("monthlyTodoCheck executed");
  },
  {
    scheduled: false,
    timezone: "Asia/Kolkata",
  }
);

const quaterlyTodoCheck = cron.schedule(
  "59 23 28-31 3,6,9,12 *",
  () => {
    console.log("quaterlyTodoCheck executed");
  },
  {
    scheduled: false,
    timezone: "Asia/Kolkata",
  }
);

const halfYearlyTodoCheck = cron.schedule(
  "59 23 30-31 6,12 *",
  () => {
    console.log("halfYearlyTodoCheck executed");
  },
  {
    scheduled: false,
    timezone: "Asia/Kolkata",
  }
);

const yearlyTodoCheck = cron.schedule(
  "59 23 31 12 *",
  () => {
    console.log("yearlyTodoCheck executed");
  },
  {
    scheduled: false,
    timezone: "Asia/Kolkata",
  }
);

module.exports = { cronJobScheduler };

// module.exports = {dailyTodoCheck, weeklyTodoCheck, monthlyTodoCheck, quaterlyTodoCheck, halfYearlyTodoCheck, yearlyTodoCheck};
