class CommentsController < ApplicationController
  def index
    @comments = Comment.all
    render json: @comments
  end

  def show
    @comment = Comment.find(params[:id])
    render json: @comment
  end

  def new
    @comment = Comment.new
  end

  def create
    puts(params)
        @feature = Feature.find(params[:id])
        @comment = Comment.new(comment_params)
        @comment.feature = @feature
        if @comment.save
            render json: @comment
        else
            render json: @comment.errors, status: :unprocessable_entity
        end
   end
  

   def destroy
    @comment = Comment.find(params[:id])
    @comment.destroy
    end



  private

  def comment_params
    params.require(:comment).permit(:body, :id)

  end
end