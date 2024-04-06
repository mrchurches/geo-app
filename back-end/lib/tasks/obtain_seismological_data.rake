namespace :obtain_seismological_data do
    desc "Obtiene los datos de la api de los ultimos 30 días y los guarda en db"
    task :get_data => :environment do
        require 'net/http'
        require 'json'
        require 'progress_bar'
    
        url = URI.parse('https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_month.geojson')
        response = Net::HTTP.get(url)
        data = JSON.parse(response)

        total_items = data['features'].count
        bar = ProgressBar.new(total_items)
        
        
        data['features'].each do |item|
            item['properties']['time'] = Time.at(item['properties']['time'] / 1000).strftime("%Y-%m-%d %H:%M:%S")
            
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

            bar.increment!
            
        end
    end
end
