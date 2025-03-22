<?php

namespace App\Http\Controllers;

use App\Notifications\PatientRegisteredNotification;
use App\Http\Requests\StorePatientRequest;
use App\Models\Patient;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
use App\Mail\PatientRegisteredMail;

class PatientController extends Controller
{
    /**
     * Listar todos los pacientes
     *
     * @OA\Get(
     *     path="/api/patients",
     *     tags={"Pacientes"},
     *     summary="Obtener todos los pacientes",
     *     description="Devuelve un array con todos los pacientes registrados",
     *     @OA\Response(
     *         response=200,
     *         description="Operación exitosa"
     *     )
     * )
     */
    public function index()
    {
        
        return Patient::all();
    }

    /**
     * 
     *
     * @OA\Post(
     *     path="/api/patients",
     *     tags={"Pacientes"},
     *     summary="Crear un paciente",
     *     description="Crea un nuevo paciente y envía un correo de confirmación",
     *     @OA\RequestBody(
     *         required=true,
     *         @OA\MediaType(
     *             mediaType="multipart/form-data",
     *             @OA\Schema(
     *                 type="object",
     *                 required={"full_name", "email", "phone_country_code", "phone_number", "document_photo"},
     *                 @OA\Property(property="full_name", type="string", example="Juan Perez"),
     *                 @OA\Property(property="email", type="string", format="email", example="juan@gmail.com"),
     *                 @OA\Property(property="phone_country_code", type="string", example="+598"),
     *                 @OA\Property(property="phone_number", type="string", example="12345678"),
     *                 @OA\Property(property="document_photo", type="string", format="binary", description="Archivo JPG")
     *             )
     *         )
     *     ),
     *     @OA\Response(response=201, description="Paciente registrado exitosamente"),
     *     @OA\Response(response=422, description="Error de validación")
     * )
     */
    public function store(StorePatientRequest $request)
    {
        
        $validated = $request->validated();
    
        
        $file = $request->file('document_photo');
        if (!$file) {
            dd('No file received');
        }
    
        
        $filename = uniqid() . '.' . $file->getClientOriginalExtension();
        $destination = storage_path('app/public/documents');
    
        
        if (!file_exists($destination)) {
            mkdir($destination, 0777, true);
        }
    
        $file->move($destination, $filename);
    
 
        $patient = Patient::create([
            'full_name' => $validated['full_name'],
            'email' => $validated['email'],
            'phone_country_code' => $validated['phone_country_code'],
            'phone_number' => $validated['phone_number'],
            'document_photo_path' => "documents/$filename",
        ]);
    
        
        $patient->notify(new PatientRegisteredNotification());
    
     
        return response()->json(['message' => 'Patient registered successfully'], 201);
    }
    

    /**
 * 
 *
 * @OA\Get(
 *     path="/api/patients/paginated",
 *     tags={"Pacientes"},
 *     summary="Obtener pacientes paginados",
 *     description="Devuelve una lista de pacientes ordenada y paginada. Se aceptan parámetros de página y per_page.",
 *     @OA\Parameter(
 *         name="page",
 *         in="query",
 *         description="Número de página (por defecto 1)",
 *         required=false,
 *         @OA\Schema(type="integer", default=1)
 *     ),
 *     @OA\Parameter(
 *         name="per_page",
 *         in="query",
 *         description="Cantidad de pacientes por página (por defecto 10)",
 *         required=false,
 *         @OA\Schema(type="integer", default=10)
 *     ),
 *     @OA\Response(response=200, description="Lista de pacientes paginados")
 * )
 */
public function paginated(Request $request)
{
    $page = (int) $request->query('page', 1);
    $perPage = (int) $request->query('per_page', 10);

    $patients = Patient::orderBy('created_at', 'desc')
        ->paginate($perPage, ['*'], 'page', $page);

    
    $items = $patients->items();

    
    $items = array_map(function ($patient) {
        return [
            'id' => $patient->id,
            'fullName' => $patient->full_name,
            'email' => $patient->email,
            'phoneCountryCode' => $patient->phone_country_code,
            'phoneNumber' => $patient->phone_number,
            'documentPhotoUrl' => $patient->document_photo_path
                ? url('storage/' . $patient->document_photo_path)
                : null,
            'createdAt' => $patient->created_at,
            'updatedAt' => $patient->updated_at,
        ];
    }, $items);

    
    return response()->json([
        'data' => $items,
        'meta' => [
            'currentPage' => $patients->currentPage(),
            'from' => $patients->firstItem() ?? 0,
            'lastPage' => $patients->lastPage(),
            'perPage' => $patients->perPage(),
            'to' => $patients->lastItem() ?? 0,
            'total' => $patients->total(),
        ],
    ]);
}

}
