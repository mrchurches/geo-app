class FeaturesController < ApplicationController
    def index

        
        mag_type = params[:mag_type].split(',') if params[:mag_type]
        page = params[:page]
        per_page = params[:per_page]
        
        @features = Feature.all

        if mag_type || page || per_page
          @total_pages = 0
          @features = apply_filters(@features, mag_type, page, per_page, @total_pages)
        end

        @features = @features.map do |feature|
            {
                id: feature.id,
                type: "feature",
                attributes: {
                    external_id: feature.external_id,
                    magnitude: feature.magnitude,
                    place: feature.place,
                    time: feature.time,
                    tsunami: feature.tsunami,
                    mag_type: feature.mag_type,
                    title: feature.title,
                    coordinates: {
                        longitude: feature.longitude,
                        latitude: feature.latitude
                    }
                },
                links: {
                    external_url: feature.external_url
                }
            }
        end

        response = {
            data: @features,
            pagination: {
                current_page: page,
                total: @total_pages,
                per_page: per_page
            }
        }

        render json: response
      end
    
    def show
        @feature = Feature.find(params[:id])
        render json: @feature.as_json(include: :comments)
    end
    
    def new
        @feature = Feature.new
    end
    
    def create
        @feature = Feature.new(feature_params)
    end
    
    def edit
        @feature = Feature.find(params[:id])
    end
    
    def update
        @feature = Feature.find(params[:id])
        if @feature.update(feature_params)
        redirect_to @feature
        else
        render 'edit'
        end
    end
    
    def destroy
        @feature = Feature.find(params[:id])
        @feature.destroy
        redirect_to features_path
    end
    
    private
        def feature_params
        params.require(:feature).permit(:name, :description, :filters)
        end

        def apply_filters(features, mag_type, page, per_page, total_pages)
            # Filtrar por tipo de magnitud (mag_type)
            if mag_type
              features = features.where(mag_type: mag_type)
            end
            @total_pages = features.count / per_page.to_i
            # Paginar resultados
            if page && per_page
              per_page = per_page.to_i
              # Limitar la cantidad de elementos por página para evitar sobrecargar el servidor
              per_page = [per_page, 1000].min
              page = page.to_i
              offset = (page - 1) * per_page
              features = features.limit(per_page).offset(offset)
            end
        
            features
        end
end
