
function showError(error) {
    const errorElem = document.getElementById("errorContainer");
    const textNode = document.createTextNode(error);
    errorElem.appendChild(textNode);
    console.error(respJson.error)
}

async function fetchAllSpecies() {
    try {
        const response = await fetch("/species");
        return await response.json();    
    } catch (err) {
        return { error: err };
    }
    
}

async function fetchPopulationData(species) {
    try {
        const url = `/population?species=${species}`
        const response = await fetch(url);
        const jsonResponse = await response.json();    
        console.debug({ url, jsonResponse });
        return jsonResponse;
    } catch (err) {
        return { error: err };
    }    
}

async function initApp() {
    // Load the list of bird species, and use them to render the options in the species
    // dropdown box.
    const speciesJson = await fetchAllSpecies();
    if (speciesJson.error) {
        showError(speciesJson.error);        
        return;
    }

    const speciesSelectElem = document.getElementById("speciesDropdown");
    for (const species of speciesJson.data) {
        // My web fundamentals are kinda weak, so I'm not sure if there's a better way
        // of dynamically generating the option elements without using a framework.
        const option = document.createElement("option");        
        option.setAttribute("value", species)
        const textNode = document.createTextNode(species);
        option.appendChild(textNode);
        speciesSelectElem.appendChild(option);
    }

    // When the species select element changes, fetch the species's population data
    // from the server, and use the data to update the graph.
    speciesSelectElem.addEventListener("change", async () => {
        const selectedSpecies = speciesSelectElem.value
        console.debug("speciesSelectElem change handler:", { selectedSpecies });
        if (!selectedSpecies) {
            return;
        }
        
        const popResponse = await fetchPopulationData(selectedSpecies)
        if (popResponse.error) {
            showError(popResponse.error);
            return;
        }

        // Render the graph.
        const x = [];
        const y = [];
        for (item of popResponse.data) {
            x.push(item.year);
            y.push(item.count);
        }

        const plotlyData = {x, y};
        Plotly.newPlot('birdsPopulationPlot', [plotlyData]);

        // Render the heading.
        const graphTitleElem = document.getElementById("title");
        const graphTitleText = document.createTextNode(`${selectedSpecies} population`)
        graphTitleElem.replaceChildren(graphTitleText);
    })
}

initApp();