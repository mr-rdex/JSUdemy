const container = document.querySelector('.container');
const count = document.getElementById('count');
const amount = document.getElementById('amount');
const select = document.getElementById('movie');
const seats = document.querySelectorAll('.seat'); // seats dizisini tanımla

container.addEventListener('click', function (e) {
  if (e.target.classList.contains('seat') && !e.target.classList.contains('reserved')) {
    e.target.classList.toggle('selected');
    calculateTotal();
  }
});

select.addEventListener('change', function (e) {
  calculateTotal();
});

function calculateTotal() {
  const selectedSeats = container.querySelectorAll('.seat.selected');

  const selectedSeatsArr = Array.from(selectedSeats); // NodeList'i diziye dönüştür
  const seatsArr = Array.from(seats); // NodeList'i diziye dönüştür

  const selectedSeatIndexes = selectedSeatsArr.map(function(seat) {
    return seatsArr.indexOf(seat);
  });

  const selectedSeatCount = selectedSeatsArr.length;
  count.innerText = selectedSeatCount;
  amount.innerText = selectedSeatCount * select.value;

  saveToLocalStorage(selectedSeatIndexes);
}

function saveToLocalStorage(indexes) {
  localStorage.setItem('selectedSeats', JSON.stringify(indexes));
  localStorage.setItem('selectedMovieIndex', select.selectedIndex);
}

// Local Storage'dan verileri almak için getFromLocalStorage işlevini ekleyin ve çağırın
function getFromLocalStorage() {
  const selectedSeats = JSON.parse(localStorage.getItem('selectedSeats'));

  if (selectedSeats != null && selectedSeats.length > 0) {
    // Tüm koltukları temizle
    seats.forEach(function (seat) {
      seat.classList.remove('selected');
    });

    // Seçili koltukları işaretle
    selectedSeats.forEach(function (index) {
      seats[index].classList.add('selected');
    });
  }

  const selectedMovieIndex = localStorage.getItem('selectedMovieIndex');

  if (selectedMovieIndex != null) {
    select.selectedIndex = selectedMovieIndex;
    calculateTotal(); // Toplamı yeniden hesapla
  }
}

// Sayfa yüklendiğinde local storage'dan verileri getirin
getFromLocalStorage();
