<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreContactRequest;
use App\Http\Requests\UpdateContactRequest;
use App\Models\Contact;
use Illuminate\Http\Request;

class ContactController extends Controller
{
    public function index()
    {
        $contacts = Contact::all();
        return response()->json($contacts);
    }
    public function store(Request $request)
    {
        $contact = Contact::create($request->all());

        return response()->json($contact, 201);
    }


    public function show($id)
    {
        $contact = Contact::findOrFail($id);
        return response()->json($contact);
    }


    public function update(Request $request, $id)
    {
        $contact = Contact::findOrFail($id);
        $contact->update($request->validated());
        return response()->json($contact);
    }


    public function destroy($id)
    {
        $contact = Contact::findOrFail($id);
        $contact->delete();
        return response()->json(null, 204);
    }
}