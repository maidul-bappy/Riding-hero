import React from "react";
import Header from "../Header/Header";
import './Home.css'
import Bike from "../../images/bike.png"
import Car from "../../images/car.png"
import Bus from "../../images/bus.png"
import Train from "../../images/train.png"
import Vehicles from "../Vehicles/Vehicles";

const vehiclesInfo = [
  {
    id: 1,
    name: 'Bike',
    capacity: 2,
    price: 50,
    img: Bike
  },
  {
    id: 2,
    name: 'Car',
    capacity: 8,
    price: 70,
    img: Car
  },
  {
    id: 3,
    name: 'Bus',
    capacity: 30,
    price: 40,
    img: Bus
  },
  {
    id: 4,
    name: 'Train',
    capacity: 30,
    price: 20,
    img: Train
  },
]

const Home = () => {
  return (
    <div id="home">
      <Header></Header>
      <div className="container p-3">
        <div className='row'>
          {
            vehiclesInfo.map(vehicle => <Vehicles key={vehicle.id} vehicle={vehicle} ></Vehicles>)
          }
        </div>
      </div>
    </div>
  );
};

export default Home;