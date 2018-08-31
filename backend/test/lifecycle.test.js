const sails = require('sails');

before(function(done) {
  // Increase the Mocha timeout so that Sails has enough time to lift, even if you have a bunch of assets.
  this.timeout(10000);

  sails.lift({
    // Your sails app's configuration files will be loaded automatically,
    // but you can also specify any other special overrides here for testing purposes.
    datastores: {
      default: {
        adapter: 'sails-disk',
        inMemoryOnly: true,
      },
    },
    models: {
      attributes: {
        id: { type: 'number', autoIncrement: true, },
      },
    },
  }, async (err) => {
    if (err) { return done(err); }
    // here you can load fixtures, etc.
    // (for example, you might want to create some records in the database)
    await User.createEach([
      // id = 1
      { name: 'John Smith', },
      // id = 2
      { name: 'Amy McSomeone', },
      // id = 3
      { name: 'Scott Mike', },
    ]);

    await Post.createEach([
      // id = 1
      { text: 'Hello, World!', user: 1, updatedAt: 200 },
      // id = 2
      { text: 'Lorem Ipsum', user: 3, updatedAt: 100 },
    ]);

    return done();
  });
});

after((done) => {
  // here you can clear fixtures, etc.
  // (e.g. you might want to destroy the records you created above)

  sails.lower(done);
});
