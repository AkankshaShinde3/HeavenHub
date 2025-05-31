const Listing = require("../models/listing.js");

module.exports.search =  async (req, res) => {
    const searchQuery = req.query.q; 
    console.log(searchQuery);
    try {
        const allListings = await Listing.find({
            title: { $regex: searchQuery, $options: "i" } 
        });
        
        console.log("listing i got is", allListings);
        res.render("listings/index.ejs", { allListings });
    } catch (err) {
        console.error(err);
        res.status(500).send("Server Error");
    }
}
