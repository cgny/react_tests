<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\User;

class ReactController extends Controller
{
    function index()
    {
        return Inertia::render('Posts/PostComponent');
    }

    function new()
    {
        return Inertia::render('Posts/NewComponent');
    }

    function product()
    {
        $product = new \stdClass();
        $product->qty = 100;
        return Inertia::render('AllProductComponent',[
            'product_data' => $product
        ]);
    }

    function token(Request $request)
    {
        $token = $request->user()->createToken($request->token_name);
        return response()->json($token->plainTextToken);
    }

    function users()
    {
        $users = User::all()->toArray();
        return response()->json($users);
    }
}
