package com.leaseplanis.vehicledemo.rest;

import java.io.Writer;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.List;

import javax.servlet.http.HttpServletResponse;

import org.apache.commons.lang3.ArrayUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.fasterxml.jackson.databind.node.TextNode;
import com.leaseplanis.vehicledemo.entity.OptionType;
import com.leaseplanis.vehicledemo.entity.Vehicle;
import com.leaseplanis.vehicledemo.entity.VehicleOption;
import com.leaseplanis.vehicledemo.service.OptionTypeService;
import com.leaseplanis.vehicledemo.service.VehicleService;
import com.opencsv.CSVWriter;
import com.opencsv.CSVWriterBuilder;
import com.opencsv.ICSVWriter;
import com.opencsv.bean.StatefulBeanToCsv;
import com.opencsv.bean.StatefulBeanToCsvBuilder;

@RestController
@RequestMapping("/api/v1/vehicles")
public class VehicleRestController {

	@Autowired
	private VehicleService vehicleService;

	@Autowired
	private OptionTypeService optionTypeService;

	@GetMapping
	public List<Vehicle> findAll() {
		return vehicleService.findAll();
	}

	@GetMapping("/{vehicleId}")
	public ResponseEntity<Vehicle> findById(@PathVariable long vehicleId) {
		Vehicle theVehicle = vehicleService.findById(vehicleId);
		if (theVehicle == null) {
			return ResponseEntity.notFound().build();
		}
		return ResponseEntity.ok(theVehicle);
	}

	@PostMapping
	public ResponseEntity<Vehicle> save(@RequestBody Vehicle vehicle) {
		if (vehicle == null) {
			return ResponseEntity.badRequest().build();
		}
		vehicle.setId(0);
		vehicleService.save(vehicle);
		return ResponseEntity.ok(vehicle);
	}

	@PutMapping
	public ResponseEntity<Vehicle> update(@RequestBody Vehicle vehicle) {
		if (vehicle == null) {
			return ResponseEntity.badRequest().build();
		}
		vehicleService.save(vehicle);
		return ResponseEntity.ok(vehicle);
	}

	@DeleteMapping("/{vehicleId}")
	public ResponseEntity<Vehicle> delete(@PathVariable long vehicleId) {
		Vehicle theVehicle = vehicleService.findById(vehicleId);
		if (theVehicle == null) {
			return ResponseEntity.notFound().build();
		}
		vehicleService.delete(theVehicle);
		return ResponseEntity.ok(theVehicle);
	}

	@GetMapping("/optionTypes")
	public ResponseEntity<List<OptionType>> findAllOptionTypes() {
		return ResponseEntity.ok(optionTypeService.findAll());
	}

	@PostMapping("/optionTypes")
	public ResponseEntity<OptionType> save(@RequestBody TextNode optionType) {
		if (optionType == null) {
			return ResponseEntity.badRequest().build();
		}
		OptionType theOptionType = optionTypeService.save(new OptionType(optionType.asText()));
		return ResponseEntity.ok(theOptionType);
	}
	
	@GetMapping("/export-vehicles")
    public void exportCSV(HttpServletResponse response) throws Exception {

        //set file name and content type
        String filename = "vehicles.csv";

        response.setContentType("text/csv");
        response.setHeader(HttpHeaders.CONTENT_DISPOSITION,
                "attachment; filename=\"" + filename + "\"");

        // create a writer
        Writer writer = response.getWriter();

        // header record
        String[] headerRecord = {"id", "make", "model", "edition","base price"};
        
        // add option types to header record
        List<OptionType> optionTypes = optionTypeService.findAll();
        List<String> optionTypeHeaderList = new ArrayList<>();
        for (int i = 0; i < optionTypes.size(); i++) {        	
        	String headOption = optionTypes.get(i).getName().toLowerCase();        	
        	optionTypeHeaderList.add(headOption);
		}        
        String[] optionTypeHeaders = optionTypeHeaderList.toArray(new String[0]);
        String[] allHeadersRecord = ArrayUtils.addAll(headerRecord, optionTypeHeaders);

        // create a csv writer
        ICSVWriter csvWriter = new CSVWriterBuilder(response.getWriter())
                .withSeparator(CSVWriter.DEFAULT_SEPARATOR)
                .withQuoteChar(CSVWriter.NO_QUOTE_CHARACTER)
                .withEscapeChar(CSVWriter.DEFAULT_ESCAPE_CHARACTER)
                .withLineEnd(CSVWriter.DEFAULT_LINE_END)
                .build();

        // write header record
        csvWriter.writeNext(allHeadersRecord);
        
        // create vehicle records
        List<Vehicle> vehicles = vehicleService.findAll();        
        for (Vehicle vehicle : vehicles) {
        	List<String> dataList = new ArrayList<>();
        	dataList.add(""+vehicle.getId());
        	dataList.add(replaceCommas(vehicle.getMake()));
        	dataList.add(replaceCommas(vehicle.getModel()));
        	dataList.add(replaceCommas(vehicle.getEdition()));
        	dataList.add(""+vehicle.getPrice());
			
        	// add option price to vehicle record
			for (String optionTypeName : optionTypeHeaderList) {
				String optionPrice = ""; 			
				for (VehicleOption vehicleOption : vehicle.getOptions()) {
					if(vehicleOption.getOptionType().getName().equalsIgnoreCase(optionTypeName)) {
						optionPrice=""+vehicleOption.getPrice();
					}
				}
				dataList.add(optionPrice);
			}			
			csvWriter.writeNext(dataList.toArray(new String[0]));
		}
        
        // close writers
        csvWriter.close();
        writer.close();
    }
	
	private String replaceCommas(String text) {
		return text.replaceAll(",", "");
	}
}
