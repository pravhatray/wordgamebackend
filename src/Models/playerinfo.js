const mongoose = require("mongoose");

const playerinfoSchema = new mongoose.Schema(
  {
   
    name: { type: String, required: true },
    score: { type: Number,required: true, default:0 },
    dificultylevel: { type: String, required: true ,enum:["High","Medium","Low"],default:"Low"},
  },

  { timestamps: true }
);

const Playerinfo = mongoose.model("player", playerinfoSchema);

module.exports = Playerinfo;
