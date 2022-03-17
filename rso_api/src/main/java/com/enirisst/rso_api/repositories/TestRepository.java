package com.enirisst.rso_api.repositories;
import com.enirisst.rso_api.models.AREA;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.jdbc.core.namedparam.NamedParameterJdbcTemplate;
import org.springframework.stereotype.Repository;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.List;

@Repository
public class TestRepository {

    @Autowired
    private JdbcTemplate jdbcTemplate;







    public List<AREA> findAll() {
        return jdbcTemplate.query(
                "select * from AREA WHERE AREA_KM2>1000 ",
                new RowMapper<AREA>() {
                    @Override
                    public AREA mapRow(ResultSet rs, int rowNum) throws SQLException {
                        return new AREA(rs.getString("CODE_ELSTAT"), rs.getString("NAME"), rs.getString("PERIFEREIA"), rs.getDouble("AREA_KM2"));
                    }
                });


    }
}
