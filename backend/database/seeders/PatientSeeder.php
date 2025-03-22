<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\File;
use App\Models\Patient;
use Illuminate\Support\Facades\DB;

class PatientSeeder extends Seeder
{
    /**
     * Ejecuta el seeder.
     *
     * @return void
     */
    public function run()
    {
        DB::statement('TRUNCATE TABLE patients RESTART IDENTITY CASCADE');
        // Ruta de origen de las imágenes de prueba
        $sourcePath = database_path('seeders/images');

        // Ruta destino: donde se almacenan los documentos (storage/app/public/documents)
        $destinationPath = storage_path('app/public/documents');

        // Si el directorio destino no existe, créalo
        if (!File::exists($destinationPath)) {
            File::makeDirectory($destinationPath, 0755, true);
        }

        // Lista de imágenes de prueba
        $testImages = ['test1.jpg', 'test2.jpg', 'test3.jpg'];

        // Copia cada imagen de origen a destino si aún no existe
        foreach ($testImages as $image) {
            $sourceFile = $sourcePath . '/' . $image;
            $destinationFile = $destinationPath . '/' . $image;

            if (File::exists($sourceFile) && !File::exists($destinationFile)) {
                File::copy($sourceFile, $destinationFile);
            }
        }

        // Ahora, crea registros de pacientes usando estas imágenes.
        // Por ejemplo, creamos un paciente para cada imagen.
        foreach ($testImages as $image) {
            Patient::create([
                'full_name' => 'Paciente de Prueba ' . ucfirst(str_replace('.jpg', '', $image)),
                'email' => strtolower(str_replace('.jpg', '', $image)) . '@example.com',
                'phone_country_code' => '+598',
                'phone_number' => '12345678',
                // Guardamos la ruta relativa (sin el prefijo "public/")
                'document_photo_path' => 'documents/' . $image,
            ]);
        }
    }
}
