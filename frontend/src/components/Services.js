import { Cable, CircleParking, CookingPot, GlassWater, Heater, LibraryBig, Refrigerator, Shield, Shirt, Sun, Utensils, Wifi, Wind, X } from 'lucide-react'
let SERVICES  =  {
  wifi: {
    icon: <Wifi size={18} className='service-icon' />,
    selected: false
  },
  electricity: {
    icon: <Cable size={18} className='service-icon' />,
    selected: false
  },
  studying_area: {
    icon: <LibraryBig size={18} className='service-icon' />,
    selected: false
  },
  solar_power: {
    icon: <Sun size={18} className='service-icon' />,
    selected: false
  },
  backup_water: {
    icon: <GlassWater size={18} className='service-icon' />,
    selected: false
  },
  kitchen: {
    icon: <Utensils size={18} className='service-icon' />,
    selected: false
  },
  wardrobe: {
    icon: <Shirt size={18} className='service-icon' />,
    selected: false
  },
  air_conditioner: {
    icon: <Wind size={18} className='service-icon' />,
    selected: false
  },
  refrigerator: {
    icon: <Refrigerator size={18} className='service-icon' />,
    selected: false
  },
  stoves: {
    icon: <Heater size={18} className='service-icon' />,
    selected: false
  },
  backup_gas: {
    icon: <CookingPot size={18} className='service-icon' />,
    selected: false
  },
  durawall: {
    icon: <Shield size={18} className='service-icon' />,
    selected: false
  },
  parking: {
    icon: <CircleParking size={18} className='service-icon' />,
    selected: false
  }
};

export default SERVICES;