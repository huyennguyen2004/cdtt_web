<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Topic;
use App\Http\Requests\StoreTopicRequest;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Auth;

class TopicController extends Controller
{

    public function index()
    {
        $topics = Topic::all();
        return response()->json([
            'success' => true,
            'topics' => $topics
        ]);
    }
    public function store(StoreTopicRequest $request)
    {
        $validated = $request->validated();

        if (!$validated) {
            return response()->json(['success' => false, 'message' => 'Invalid data'], 400);
        }
        $topic = new Topic();
        $topic->name = $request->name;
        $topic->slug = Str::slug($request->name);
        $topic->description = $request->description;
        $topic->sort_order = $request->sort_order;
        $topic->status = $request->status;
        $topic->created_at = date('Y-m-d H:i:s');
        $topic->created_by = Auth::id() ?? 1;

        $topic->save();

        return response()->json([
            'success' => true,
            'message' => 'Topic added successfully',
            'topic' => $topic
        ], 201);
    }
    public function show($id)
    {
        $topic = Topic::findOrFail($id);
        return response()->json($topic);
    }

    public function status($id)
    {
        $topic = Topic::findOrFail($id);
        $topic->status = !$topic->status;
        $topic->save();

        return redirect()->route('');
    }
    public function update(Request $request, $id)
    {
        $topic = Topic::find($id);

        if (!$topic) {
            return response()->json([
                'success' => false,
                'message' => 'Topic not found'
            ], 404);
        }

        $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
        ]);

        $topic->name = $request->name;
        $topic->slug = Str::slug($request->name);
        $topic->description = $request->description;
        $topic->status = $request->status;
        $topic->updated_at = now();
        $topic->updated_by = Auth::id() ?? 1;

        $topic->save();

        return response()->json([
            'success' => true,
            'message' => 'Topic updated successfully!',
            'topic' => $topic
        ]);
    }


    public function delete($id)
    {
        $topic = Topic::findOrFail($id);
        $topic->delete();

    }
    public function trash()
    {
        $trashedTopics = Topic::onlyTrashed()->get();
        return response()->json([
            'success' => true,
            'topics' => $trashedTopics
        ]);
    }
    public function restore($id)
    {
        $topic = Topic::withTrashed()->findOrFail($id);
        $topic->restore();
        return response()->json([
            'success' => true,
            'message' => 'Topic restored successfully!'
        ]);
    }

    public function destroy($id)
    {
        $topic = Topic::withTrashed()->find($id);

        if (!$topic) {
            return response()->json([
                'success' => false,
                'message' => 'Topic not found'
            ], 404);
        }

        $topic->forceDelete();
        return response()->json([
            'success' => true,
            'message' => 'Topic deleted permanently!'
        ]);
    }

}
