
exports.up = function(knex) {
    return knex.schema.createTable("clucks", t => {
        t.increments("id");
        t.string("username");
        t.string("image_url");
        t.text("content");
        t.integer("viewCount");
        t.timestamp("createdAt").defaultTo(knex.fn.now());
        t.timestamp("updatedAt");
    })
};

exports.down = function(knex) {
    return knex.schema.dropTable("clucks");
  };
