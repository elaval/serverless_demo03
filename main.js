
function main() {

}


initApp = function() {

    // FirebaseUI config.
    var uiConfig = {
        signInSuccessUrl: '.',
        signInOptions: [
            // Leave the lines as is for the providers you want to offer your users.
            firebase.auth.GoogleAuthProvider.PROVIDER_ID,
            firebase.auth.EmailAuthProvider.PROVIDER_ID,
        ],
        // Terms of service url.
        tosUrl: '<your-tos-url>'
    };

    // Initialize the FirebaseUI Widget using Firebase.
    var ui = new firebaseui.auth.AuthUI(firebase.auth());
    // The start method will wait until the DOM is loaded.
    ui.start('#firebaseui-auth-container', uiConfig);

    // Monitor when a user logs in or logs out
    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
            // User is signed in.
            var displayName = user.displayName;
            var email = user.email;
            var uid = user.uid;
            user.getIdToken().then(function(accessToken) {
                d3.selectAll('.username').text(displayName);
                d3.select('#sign-in-status').attr('class', 'visible');
                d3.select('#sign-out')
                .on('click', () => firebase.auth().signOut());
                d3.select('#token').text(`Bearer ${accessToken}`);

            })
            
            d3.select('#sign-out')
                .classed('hidden', false);  

            d3.select('#signed-in-content')
                .attr('class', 'visible');

            d3.select('#signed-out-content')
                .attr('class', 'hidden')

        } else {
            // User is signed out.
            d3.select('#sign-in-status').text('Signed out');

            d3.select('#sign-out')
            .classed('hidden', true);  

            d3.select('#signed-in-content')
                .attr('class', 'hidden');
                
            d3.select('#signed-out-content')
                .attr('class', 'visible')


        }
    }, function(error) {
        console.log(error);
    });
};

window.addEventListener('load', function() {
    initApp()
});

