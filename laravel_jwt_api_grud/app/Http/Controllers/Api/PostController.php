<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\PostResource;
use App\Models\Post;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class PostController extends Controller
{
    use ApiResponseTrait;

    public function index(){

        //$posts = PostResource::collection(Post::get());
        $posts = Post::get();

        return $this->apiResponse($posts,'ok',200);
    }

    public function show($id){

        $post = Post::find($id);

        if($post){
            return $this->apiResponse($post,'ok',200);
        }
        return $this->apiResponse(null,'The post Not Found',404);

    }

    public function store(Request $request){

        $validator = Validator::make($request->all(), [
            'name' => 'required|max:255',
            'status' => 'required',
        ]);

        if ($validator->fails()) {
            return $this->apiResponse(null,$validator->errors(),400);
        }

        $post = Post::create($request->all());

        if($post){
            return $this->apiResponse(new PostResource($post),'The post Save',201);
        }

        return $this->apiResponse(null,'The post Not Save',400);
    }


    public function update(Request $request ,$id){

        $validator = Validator::make($request->all(), [
            'name' => 'required|max:255',
            'status' => 'required',
        ]);

        if ($validator->fails()) {
            return $this->apiResponse(null,$validator->errors(),400);
        }

        $post=Post::find($id);

        if(!$post){
            return $this->apiResponse(null,'The post Not Found',404);
        }

        $post->update($request->all());

        if($post){
            return $this->apiResponse($post,'The post update',201);
        }

    }


    public function destroy($id){

        $post=Post::find($id);

        if(!$post){
            return $this->apiResponse(null,'The post Not Found',404);
        }

        $post->delete(); // No need to pass $id here.

        if($post){
            return $this->apiResponse(null,'The post deleted',200);
        }

    }
}
