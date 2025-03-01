db.games.findOne()

db.games.aggregate([
{$project:{gid:1, name:"$name"}}
])