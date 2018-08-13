The files in `models/` are simple, type-safe wrappers around the untyped
JSON returned from the server.

Each one has a `fromJSON` function that wraps the json data in this class,
as well as parsing any dates into `Date` objects, etc.
They also have a `toJSON` function, which takes as an argument an interface
that defines the fields needed, then destructures them into a new JSON object.
This is used when creating new posts/comments/users to send to the server,
making sure that we're only sending the fields that are needed and not any others that might be accidentally added to the object.

Any tests needed for e.g. null data, invalid values, should be added here,
making that code easy to locate, and meaning the rest of the code base
can assume that these classes are valid.
