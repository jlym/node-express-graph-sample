CREATE TABLE birds(
    species TEXT NOT NULL,
    year INTEGER NOT NULL,
    count INTEGER NOT NULL
);

INSERT INTO birds (species, year, count)
VALUES
    ("pigeon", 2015, 50000),
    ("pigeon", 2016, 60000),
    ("pigeon", 2017, 60500),
    ("pigeon", 2018, 70000),
    ("pigeon", 2019, 69000),
    ("pigeon", 2020, 65000),
    ("hummingbird", 2015, 20004),
    ("hummingbird", 2016, 20100),
    ("hummingbird", 2017, 19942),
    ("hummingbird", 2018, 18492),
    ("hummingbird", 2019, 17392),
    ("hummingbird", 2020, 16938);
