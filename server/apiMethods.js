import { Meteor } from "meteor/meteor";
import {getPlant, getPlants, getPlantsCommon, getPlantByID} from "./trefleAPI";
import { Promise } from "meteor/promise";

Meteor.methods({'plants.getPlant'({plantId}){
    const plantResponse = getPlantByID(plantId)
      .then(function(response){
        return response;
      })
      .catch(function(error){
          console.log(error)
      });
      return plantResponse;
    }
})

//temporary
Meteor.methods({'plants.getPlants'({plantId}){
        const plant = getPlants(plantId)
            .then(function(response){
                return response;
            return response;
        })
            .catch(function(error){
                console.log(error)
            });

            return plant;
}

})

Meteor.methods({
    'plants.searchCommon'(commonName) {
        const plant = getPlantsCommon(commonName)
            .catch(function(error){
                console.log(error);
            })
            .then(function (response) {
                return response;
            });

        return plant;
    }
})

Meteor.methods( {
    'plants.search'(searchParams){
        const plant = getPlant(searchParams)
            .then(function(response){
                return response;
            })
            .catch(function(error){
                console.log(error);
            });
        return plant;
    }
});
