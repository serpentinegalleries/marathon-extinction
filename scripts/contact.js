$(function(){
  $('#contact').urlModal();
});

var input;

var base = new Firebase('https://extinctly.firebaseio.com/');

function onSubmit() {
    var contact_email = $('#contact_email').val();
    var link1_url = $('#link1_url').val();
    var description_long = $('#description_long').val();
    var category = $('#category').val();
    var location = $('#location').val();
    var name = $('#name').val();
    base.push({contact_email: contact_email, link1_url: link1_url, description_long: description_long, category: category, location: location, name: name});
  };

$(function(){
  $('#anna-zett, #jesse-darling, #julian-oliver, #alex-mackin-dolan, #david-blandy, #emily-jones, #femke-herregraven, #folder, #kari-altmann, #lisa-ma, #kev-bewersdorf, #michael-wang, #tobias-revell, #ubermorgen, #holly-white').urlModal();
});

$(function(){
  $('#ameg, #appropedia, #bitnation, #detroit-water-brigade, #ethereum, #extinction-symbol, #geeks-without-bounds, #global-distribution, #hack4good, #hacker-global-space-program, #hexayurt, #humanitarian-osm-team, #mit-cityfarm, #open-bazaar, #open-droplet, #open-oil, #open-source-beehives, #open-source-ecology, #deephorizon-ubermorgen, #outernet, #robobees, #sea-shepherd, #star-tide, #tesla-motors').urlModal();
});


