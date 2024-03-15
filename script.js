document.addEventListener("DOMContentLoaded", function () {
    const MovieList = [
        { name: "Flash", price: 7 },
        { name: "Avengers", price: 10 },
        { name: "Joker", price: 8 },
        // Add more movies if needed
    ];

    const selectMovie = document.getElementById('selectMovie');
    const movieNameElem = document.getElementById('movieName');
    const moviePriceElem = document.getElementById('moviePrice');
    const totalPriceElem = document.getElementById('totalPrice');
    const selectedSeatsHolderElem = document.getElementById('selectedSeatsHolder');
    const seatCont = document.getElementById('seatCont');
    const proceedBtn = document.getElementById('proceedBtn');
    const cancelBtn = document.getElementById('cancelBtn');

    // Populate dropdown with movie options
    MovieList.forEach(movie => {
        const option = document.createElement('option');
        option.textContent = movie.name;
        selectMovie.appendChild(option);
    });

    // Default movie selection
    selectMovie.value = 'Flash';

    // Update selected movie details
    selectMovie.addEventListener('change', () => {
        const selectedMovie = MovieList.find(movie => movie.name === selectMovie.value);
        movieNameElem.textContent = selectedMovie.name;
        moviePriceElem.textContent = '$ ' + selectedMovie.price;
        updateTotalPrice();
    });

    // Seat selection logic
    const selectedSeats = [];
    seatCont.addEventListener('click', event => {
        if (event.target.classList.contains('seat') && !event.target.classList.contains('occupied')) {
            event.target.classList.toggle('selected');
            updateTotalPrice();
            updateSelectedSeats();
        }
    });

    // Update total price based on selected seats
    function updateTotalPrice() {
        const selectedMovie = MovieList.find(movie => movie.name === movieNameElem.textContent);
        const selectedSeatsCount = document.querySelectorAll('.seat.selected').length;
        totalPriceElem.textContent = '$ ' + (selectedSeatsCount * selectedMovie.price);
    }

    // Update selected seats count
    function updateSelectedSeats() {
        const selectedSeatsCount = document.querySelectorAll('.seat.selected').length;
        document.getElementById('numberOfSeat').textContent = selectedSeatsCount;
        selectedSeatsHolderElem.textContent = selectedSeatsCount > 0 ? 'Selected Seats' : 'No Seat Selected';
    }

    // Continue button logic
    proceedBtn.addEventListener('click', () => {
        const selectedSeats = document.querySelectorAll('.seat.selected');
        if (selectedSeats.length === 0) {
            alert('Oops! No seat selected.');
        } else {
            alert('Yayy! Your seats have been booked.');
            selectedSeats.forEach(seat => {
                seat.classList.remove('selected');
                seat.classList.add('occupied');
            });
            updateTotalPrice();
            document.getElementById('numberOfSeat').textContent = 0;
            selectedSeatsHolderElem.textContent = 'No Seat Selected';
        }
    });

    // Cancel button logic
    cancelBtn.addEventListener('click', () => {
        const selectedSeats = document.querySelectorAll('.seat.selected');
        selectedSeats.forEach(seat => {
            seat.classList.remove('selected');
        });
        updateTotalPrice();
        document.getElementById('numberOfSeat').textContent = 0;
        selectedSeatsHolderElem.textContent = 'No Seat Selected';
    });
});
