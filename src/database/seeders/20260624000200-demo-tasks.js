"use strict";

module.exports = {
  async up(queryInterface) {
    const now = new Date();

    await queryInterface.bulkInsert("tasks", [
      {
        title: "Prepare project plan",
        description: "Create the initial execution plan for the task management rollout.",
        priority: "high",
        status: "open",
        due_date: "2026-07-01",
        created_by: 1,
        assigned_to: 2,
        created_at: now,
        updated_at: now
      },
      {
        title: "Build authentication screens",
        description: "Implement login and register forms in the frontend.",
        priority: "medium",
        status: "in_progress",
        due_date: "2026-07-03",
        created_by: 2,
        assigned_to: 2,
        created_at: now,
        updated_at: now
      },
      {
        title: "QA task workflow",
        description: "Validate create, update, assign, and delete permissions.",
        priority: "low",
        status: "testing",
        due_date: "2026-07-05",
        created_by: 1,
        assigned_to: 1,
        created_at: now,
        updated_at: now
      }
    ]);
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete("tasks", null, {});
  }
};
