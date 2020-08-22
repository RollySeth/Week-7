const { Router } = require('express');
const router = Router();
const weatherDAO= require ('../daos/weather'); 

//adding weather/temperature by location
router.post("/", async (req, res,next) => {
  const name = req.body.name;
  const temperature=req.body.temperature;
  if(!name || !temperature)
  {
    res.status(400).send("Location name and temperature are required");
  }
  else 
  {
    try{
    const weather = await weatherDAO.addWeather(name, temperature);
    if (weather) 
      {
       res.redirect("weather");
      } 
      else
      {
     res.sendStatus(401);
      }
      }
    catch(e)
    {
    res.status(500).send(e.message);
    }
  }
}  
);

//Rendering Form- weather search by location -- at weather.mustache 
router.get("/", async (req, res, next) => 
  {
  res.render("weather");
  }
); 

//Rendering searched weather -- at location.mustache 
router.get("/location", async (req, res, next) =>   
  {
   let {name} = req.query;
   console.log(` {name} `);
   if (name) {
      let weather = await weatherDAO.getWeather(name);
      if (weather) {
        res.render('location', {
          name: weather.name,
          temperature: weather.temperature
        })
      } else {
        //if location doesn't exist in database
        res.statusCode = 404;
        res.render('location', {
          name: 'Other',
          temperature: 'not available'
        })
      }
    } else {
      //redirecting back to form page as no location name was provided
     res.redirect("/weather");
    }
  });



module.exports = router;