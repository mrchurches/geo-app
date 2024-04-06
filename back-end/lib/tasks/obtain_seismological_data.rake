namespace :obtain_seismological_data do
    desc "Obtiene los datos de la api de los ultimos 30 días y los guarda en db"
    # task :nombre_de_la_subtarea => :environment do
    #   require 'net/http'
    #   require 'json'
  
    #   url = URI.parse('URL_DEL_ENDPOINT')
    #   response = Net::HTTP.get(url)
    #   data = JSON.parse(response)
  
    #   data.each do |item|
    #     # Aquí puedes crear instancias de tu modelo basadas en los datos obtenidos
    #     Modelo.create(
    #       atributo1: item['atributo1'],
    #       atributo2: item['atributo2'],
    #       # Y así sucesivamente...
    #     )
    #   end
    # end
    task :get_data => :environment do
        require 'net/http'
        require 'json'
    
        url = URI.parse('https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_month.geojson')
        response = Net::HTTP.get(url)
        data = JSON.parse(response)
    
        data['features'].each do |item|
            Feature.create(
            external_id: item['id'],
            magnitude: item['properties']['mag'],
            place: item['properties']['place'],
            time: item['properties']['time'],
            tsunami: item['properties']['tsunami'],
            mag_type: item['properties']['magType'],
            title: item['properties']['title'],
            longitude: item['geometry']['coordinates'][0],
            latitude: item['geometry']['coordinates'][1],
            external_url: item['properties']['url']
            )
        end
    end
end
