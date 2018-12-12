//function that gets data from Flickr API and appends the images to the website with pagination.
function searchFor(pageSet) {

    var yourInterest = document.getElementById('search').value;
    console.log(yourInterest);
    if (yourInterest !== "") {
        document.body.style.cssText = "background-image:none;"
    }

    if (yourInterest !== "") {

        var photoDiv = document.getElementById("imagesGoHere").innerHTML = "";

        var url = "http://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=f4cba17fae1e58d710af7c5efe9129b3&tags=" + yourInterest + "&safe_search=1&per_page=50";

        $.ajax({
            url: url + "&format=json&jsoncallback=?",
            dataType: "json",
            success: function (data) {
                console.log(data);
                //instruction for url format for flickr is: //https://farm{farm-id}.staticflickr.com/{server-id}/{id}_{secret}.jpg

                //-------using API to get Images--------------//
                for (i = pageSet; i < pageSet + 10; i++) {
                    //get the pieces for the image url.
                    var farm = data.photos.photo[i].farm;
                    var serverId = data.photos.photo[i].server;
                    var secret = data.photos.photo[i].secret;
                    var theID = data.photos.photo[i].id;

                    //put the pieces together into url.
                    var imgURL = "https://farm" + farm + ".staticflickr.com/" + serverId + "/" + theID + "_" + secret + ".jpg";
                    console.log(imgURL);

                    //get,create div, fill with url, style and append.

                    //get,create
                    var imagesGoHere = document.getElementById('imagesGoHere');
                    var photoDiv = document.createElement('div');
                    //style
                    photoDiv.className = "col-md-6 col-12 singlePhoto";
                    photoDiv.style.cssText = "border: 30px solid white; background-repeat: no-repeat; background-size: cover; height: 500px;padding:0px;";
                    photoDiv.style.backgroundImage = "url(" + imgURL + ")";

                    //apend
                    imagesGoHere.appendChild(photoDiv);


                }

                //-----------Set up Pagination------//
                //reveal pagination on search
                var pagination = document.getElementById('pagination');
                pagination.className = "show";
                //------------End Pagination---------//


                //--modal click event listener--//
                var showModal = function showModal(theImage) {
                    //create modal
                    //empty previous contents
                    var modal = document.getElementById('modal');
                    modal.innerHTML = "";
                    //create closebutton
                    var closeButton = document.createElement('span');
                    closeButton.innerHTML = "<i class='fas fa-times'></i>";
                    closeButton.className = "closeBtn";
                    //append closebutton to modal
                    modal.appendChild(closeButton);
                    //style&fill modal
                    modal.style.cssText = "display:block";
                    modal.setAttribute('onclick', 'closefunc()');
                    modal.innerHTML = "<img src=" + theImage + ">";
                }

                photoDiv.addEventListener('click', showModal(imgURL));

            },
            type: "get",
        })
    } else {
        alert('please enter search criteria');
    }
}



//search on enter key
document.addEventListener('keypress',
    function (e) {
        if (13 == e.keyCode) {
            searchFor(0);
        }
    });


//click to close modal (anywhere)
function closefunc() {
    var modal = document.getElementById('modal');
    modal.style.cssText = "display:none";
}
